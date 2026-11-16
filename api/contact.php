<?php
/**
 * UDAAN website contact / membership inquiry handler.
 *
 * Receives the form on contact.html and emails it to info@udaan.org.np.
 * - Accepts POST only; answers JSON for the site's JavaScript, or redirects
 *   back to the contact page when JavaScript is off.
 * - Spam protection: hidden honeypot field, per-IP rate limit, same-site check.
 * - Header-injection safe: line breaks stripped from anything used in headers.
 */

const RECIPIENT      = 'info@udaan.org.np';
const FROM_ADDRESS   = 'no-reply@udaan.org.np';
const SITE_HOST      = 'udaan.org.np';
const RATE_LIMIT     = 5;     // submissions ...
const RATE_WINDOW    = 3600;  // ... per IP per hour
const INQUIRY_TYPES  = [
    'membership' => 'Membership Inquiry',
    'general'    => 'General Inquiry',
    'training'   => 'Training',
    'regulatory' => 'Regulatory',
];

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond($status, $ok, $message, $wantsJson)
{
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true, 'message' => $message] : ['ok' => false, 'error' => $message]);
    } else {
        header('Location: /contact.html?' . ($ok ? 'sent=1' : 'error=1') . '#contact-form', true, 303);
    }
    exit;
}

function field($name, $max)
{
    $value = trim((string)($_POST[$name] ?? ''));
    $value = str_replace("\0", '', $value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

function oneLine($value)
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value));
}

// 1. Method
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.', true);
}

// 2. Same-site check (browsers send Origin on POST; fall back to Referer)
$source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$sourceHost = $source !== '' ? (string)parse_url($source, PHP_URL_HOST) : '';
if ($sourceHost !== '' && $sourceHost !== SITE_HOST && $sourceHost !== 'www.' . SITE_HOST) {
    respond(403, false, 'Please use the form on udaan.org.np.', $wantsJson);
}

// 3. Honeypot: bots fill the hidden field; pretend success and do nothing
if (field('_gotcha', 200) !== '') {
    respond(200, true, 'Thank you!', $wantsJson);
}

// 4. Validate
$name    = oneLine(field('name', 120));
$email   = oneLine(field('email', 200));
$phone   = oneLine(field('phone', 40));
$type    = field('inquiry-type', 40);
$subject = oneLine(field('subject', 200));
$message = field('message', 5000);

$errors = [];
if ($name === '')                                    $errors[] = 'your name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))      $errors[] = 'a valid email address';
if (!array_key_exists($type, INQUIRY_TYPES))         $errors[] = 'an inquiry type';
if ($subject === '')                                 $errors[] = 'a subject';
if (strlen($message) < 5)                         $errors[] = 'a message';
if ($phone !== '' && !preg_match('/^[0-9+()\-\s]{6,40}$/', $phone)) $errors[] = 'a valid phone number';
if ($errors) {
    respond(400, false, 'Please provide ' . implode(', ', $errors) . '.', $wantsJson);
}

// 5. Rate limit per IP (small file in the system temp folder, outside the website)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/udaan-contact-' . hash('sha256', $ip . SITE_HOST);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rateFile))),
        function ($t) use ($now) { return $t > $now - RATE_WINDOW; }
    );
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, false, 'Too many messages from your connection. Please email info@udaan.org.np instead.', $wantsJson);
}
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

// 6. Send
function encodeHeader($text)
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8');
    }
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

$typeLabel = INQUIRY_TYPES[$type];
$mailSubject = '[UDAAN website] ' . $typeLabel . ': ' . $subject;
$body = implode("\n", [
    'New inquiry from the UDAAN website contact form.',
    '',
    'Type:    ' . $typeLabel,
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . ($phone !== '' ? $phone : '-'),
    'Subject: ' . $subject,
    '',
    'Message:',
    $message,
    '',
    '--',
    'Sent ' . gmdate('Y-m-d H:i') . ' UTC from udaan.org.np/contact.html',
    'Reply to this email to answer ' . $name . ' directly.',
]);

$headers = [
    'From: UDAAN Website <' . FROM_ADDRESS . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: UDAAN-Website',
];

$sent = mail(
    RECIPIENT,
    encodeHeader($mailSubject),
    $body,
    implode("\r\n", $headers),
    '-f' . FROM_ADDRESS
);

if (!$sent) {
    respond(500, false, 'Sorry, your message could not be sent. Please email info@udaan.org.np or call 01-4536-9808.', $wantsJson);
}

respond(200, true, 'Thank you! Your inquiry has been sent.', $wantsJson);

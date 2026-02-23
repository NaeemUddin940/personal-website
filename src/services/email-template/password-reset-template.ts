import { passwordResetTemplateProps } from "@/@types/send-email";

export function passwordResetTemplate(
  userName,
  url,
  companyName,
): passwordResetTemplateProps {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            --bg-body: #f4f4f4;
            --bg-main: #ffffff;
            --text-main: #333333;
            --text-heading: #1a202c;
            --header-bg: #2D3748;
            --border-color: #e2e8f0;
            --warning-text: #718096;
            --footer-text: #999999;
        }

        .dark-preview {
            --bg-body: #020617;
            --bg-main: #0f172a;
            --text-main: #cbd5e1;
            --text-heading: #f1f5f9;
            --header-bg: #1e293b;
            --border-color: #1e293b;
            --warning-text: #94a3b8;
            --footer-text: #64748b;
        }

        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            background-color: var(--bg-body); 
            margin: 0; 
            padding: 0; 
            transition: background 0.3s ease;
        }
        .wrapper { width: 100%; table-layout: fixed; background-color: var(--bg-body); padding-bottom: 40px; }
        .main { 
            background-color: var(--bg-main); 
            margin: 0 auto; 
            width: 100%; 
            max-width: 600px; 
            border-spacing: 0; 
            color: var(--text-main); 
            border-radius: 8px; 
            overflow: hidden; 
            margin-top: 40px; 
            border: 1px solid var(--border-color); 
        }
        .header { background-color: var(--header-bg); padding: 20px; text-align: center; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .button-container { text-align: center; padding: 20px 0; }
        .button { 
            background-color: #624dfe; 
            color: #ffffff !important; 
            padding: 15px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            display: inline-block; 
        }
        .footer { text-align: center; font-size: 12px; color: var(--footer-text); padding: 20px; }
        .warning { 
            font-size: 13px; 
            color: var(--warning-text); 
            border-top: 1px solid var(--border-color); 
            margin-top: 25px; 
            padding-top: 20px; 
        }
        h1, h2 { color: var(--text-heading); }
    </style>
</head>
<body id="preview-body">
    <div class="wrapper">
        <table class="main">
            <tr>
                <td class="header">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${companyName}</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h2 style="margin-top: 0;">Password Reset Request</h2>
                    <p>Hi ${userName},</p>
                    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                    
                    <div class="button-container">
                        <a href="${url}" class="button">Reset My Password</a>
                    </div>
                    
                    <p>This link will expire in <strong>60 minutes</strong>.</p>
                    
                    <div class="warning">
                        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
                        <p style="word-break: break-all;"><a href="${url}" style="color: #4A90E2;">${url}</a></p>
                    </div>
                </td>
            </tr>
        </table>
        
        <table style="margin: 0 auto; width: 100%; max-width: 600px;">
            <tr>
                <td class="footer">
                    &copy; 2026 ${companyName}. All rights reserved.<br>
                    123 Business Ave, Tech City, ST 12345
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;
}

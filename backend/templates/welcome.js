export function welcomeBody(userName) {
  return `
         <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="text-align: center; padding: 10px; background-color: #16A34A; color: white; border-radius: 8px;">
                <h1 style="margin: 0;">CV Builder</h1>
            </div>
            <p>Hello ${userName},</p>
            <p>Your account has been successfully created.</p>
            <p>Start building your professional CV today.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">
                © 2025 CV Builder. All rights reserved.
            </p>
        </div>
    `;
}

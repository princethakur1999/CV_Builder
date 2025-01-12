export function otpBody(otp) {
  return `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="text-align: center; padding: 10px; background-color: #16A34A; color: white; border-radius: 8px;">
                <h1 style="margin: 0;">CV Builder</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #16A34A; border-radius: 8px; margin-top: 20px;">
                <p style="font-size: 16px; font-weight: bold;">Hello,</p>
                <p style="margin: 10px 0;">Your One-Time Password for CV Builder is</p>
                <p style="font-size: 28px; font-weight: bold; text-align: center; color: #16A34A; padding: 10px;">
                    ${otp}
                </p>
                <p style="margin-top: 20px;">
                    Please do not share it with anyone.
                </p>
                <p style="margin-top: 20px; font-size: 14px; color: #555;">
                    Thank you for choosing CV Builder to create your perfect resume.
                </p>
            </div>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
                <p>© 2025 CV Builder. All rights reserved.</p>
            </footer>
        </div>
    `;
}

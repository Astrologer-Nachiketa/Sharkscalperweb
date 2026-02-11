/**
 * Google Apps Script - Shark WebScalper License Activation Backend
 * This script handles PDF generation and license activation notifications via email.
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    "status": "active", 
    "message": "Shark WebScalper API is running" 
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // 1. Parse incoming data from the website
    const data = JSON.parse(e.postData.contents);
    const mobile = data.mobile;
    const email = data.email || "Unknown User";
    const flattradeUserId = data.flattradeUserId || "Not Provided";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const recipient = "saratbotfire@gmail.com"; // Your receiving email

    // 2. Define the PDF/HTML Layout with full EULA
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; color: #1a202c; line-height: 1.6; font-size: 10px; }
            .header { background-color: #0a0e17; color: #00ffcc; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
            .section-title { color: #2d3748; border-bottom: 2px solid #00ffcc; padding-bottom: 6px; margin-top: 18px; font-size: 12px; font-weight: bold; }
            .user-info { background-color: #f7fafc; padding: 12px; border-radius: 6px; margin: 15px 0; }
            .user-info p { margin: 4px 0; }
            .footer { margin-top: 25px; text-align: center; color: #a0aec0; font-size: 9px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
            .highlight { color: #00ffcc; font-weight: bold; }
            ul { margin: 6px 0; padding-left: 18px; }
            li { margin: 3px 0; }
            .sebi-warning { background-color: #fff5f5; border-left: 4px solid #fc8181; padding: 10px; margin: 12px 0; }
            .tech-warning { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px; margin: 12px 0; }
            .advice-warning { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px; margin: 12px 0; }
            .liability-warning { background-color: #f3f4f6; border-left: 4px solid #6b7280; padding: 10px; margin: 12px 0; }
            .acceptance { background-color: #f0fff4; border-left: 4px solid #00ffcc; padding: 12px; margin: 15px 0; font-style: italic; font-size: 11px; }
            h1 { margin: 0; font-size: 24px; }
            h2 { margin: 0; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SHARK WEBSCALPER</h1>
            <h2>END USER LICENSE AGREEMENT (EULA)</h2>
            <p style="font-size: 10px; margin: 5px 0 0 0;">Dr. L T Trading Service</p>
          </div>
          
          <div class="content">
            <div class="user-info">
              <p><strong>Date:</strong> ${timestamp}</p>
              <p><strong>Mobile Number:</strong> ${mobile}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Flattrade User ID:</strong> ${flattradeUserId}</p>
            </div>
            
            <h3 class="section-title">Important Trading Disclaimer & Risk Disclosure</h3>
            
            <div class="sebi-warning">
              <strong>1. SEBI Mandatory Risk Disclosure (September 2024)</strong>
              <p>As per the latest SEBI study, investors should be aware of the following facts regarding Equity Futures & Options (F&O) trading:</p>
              <ul>
                <li>9 out of 10 individual traders in the equity F&O segment incurred net losses</li>
                <li>On average, loss-makers registered a net loss of ₹2 Lakh per person (inclusive of transaction costs)</li>
                <li>Those making net profits, on average, saw transaction costs consume 30% to 50% of their total trading profits</li>
              </ul>
            </div>

            <div class="tech-warning">
              <strong>2. Software Usage & Technical Risks</strong>
              <p>Shark WebScalper is a browser-based tool designed for option trading and is integrated with Flattrade Broker. By using this software, you acknowledge and agree that:</p>
              <ul>
                <li><strong>Technical Issues:</strong> Trading involves sophisticated technology. Dr. L T Trading Service is not responsible for any financial losses resulting from technical glitches, internet connectivity issues, software bugs, server downtime, or API failures between the browser and the broker.</li>
                <li><strong>"As Is" Basis:</strong> The software is provided on an "as is" and "as available" basis. The user assumes all risks associated with automated or manual execution of trades via this interface.</li>
              </ul>
            </div>

            <div class="advice-warning">
              <strong>3. No Financial Advice</strong>
              <p>Dr. L T Trading Service is a technology provider and <strong>NOT</strong> a SEBI-registered Investment Advisor (IA) or Research Analyst (RA):</p>
              <ul>
                <li><strong>No Tips/Strategy:</strong> We do not provide trading tips, "sure-shot" signals, or investment strategies</li>
                <li><strong>User Responsibility:</strong> All trading decisions, including the choice of strikes, quantity, and timing, are made solely by the user. Any strategy executed through Shark WebScalper is the user's own responsibility</li>
                <li><strong>Consultation:</strong> We strongly recommend that you consult with a qualified financial advisor before engaging in high-risk derivative trading</li>
              </ul>
            </div>

            <div class="liability-warning">
              <strong>Summary of Liability</strong>
              <p>Dr. L T Trading Service and its affiliates shall not be held liable for any direct, indirect, or consequential financial losses incurred while using the Shark WebScalper browser. Trading in the Indian stock market involves substantial risk of capital loss.</p>
            </div>

            <h3 class="section-title">1. License Grant</h3>
            <p>Licensor grants you a non-exclusive, non-transferable, non-commercial, and revocable license to use the Software solely for personal purposes. You may not use the Software for any commercial activities, including but not limited to reselling, distributing, or otherwise making the Software available to third parties for monetary gain.</p>

            <h3 class="section-title">2. Restrictions</h3>
            <p>You agree not to:</p>
            <ul>
              <li><strong>Resell or Distribute:</strong> You may not sell, rent, lease, sublicense, or distribute the Software, or any copies of it, to any third party.</li>
              <li><strong>Modify or Reverse Engineer:</strong> You are prohibited from altering, adapting, reverse engineering, decompiling, disassembling, or creating derivative works based on the Software.</li>
              <li><strong>Circumvent Security:</strong> Any attempt to circumvent, disable, or bypass any features, protections, or security mechanisms of the Software is strictly prohibited.</li>
              <li><strong>Non-Commercial Use:</strong> The Software is licensed for personal, non-commercial use only. Commercial use or exploitation in any form is a violation of this Agreement.</li>
              <li><strong>Cracking or Unauthorized Access:</strong> You may not attempt to access, modify, or distribute unauthorized versions of the Software or any component thereof.</li>
            </ul>

            <h3 class="section-title">3. Technical Risks & Software Usage</h3>
            <p>Shark WebScalper is a browser-based tool designed for option trading and is integrated with Flattrade Broker. By using this software, you acknowledge and agree that:</p>
            <ul>
              <li><strong>Technical Issues:</strong> Trading involves sophisticated technology. API connectivity issues, exchange downtimes, software bugs, or internet disruptions are beyond our control.</li>
              <li><strong>No Guarantee:</strong> The Software provides automation but does not guarantee profits or prevent losses.</li>
              <li><strong>Execution Risk:</strong> Order execution delays may occur due to broker API limitations or market conditions.</li>
            </ul>

            <h3 class="section-title">4. Ownership</h3>
            <p>The Software is licensed, not sold. Licensor retains all rights, title, and interest, including all intellectual property rights, in and to the Software. The license granted to you does not convey any rights of ownership in the Software.</p>

            <h3 class="section-title">5. Term and Termination</h3>
            <p>This Agreement is effective upon your acceptance and will continue until terminated. Licensor may terminate this Agreement at any time if you breach any of its terms. Upon termination, you must immediately cease using the Software and destroy all copies in your possession.</p>

            <h3 class="section-title">6. Warranty Disclaimer</h3>
            <p>The Software is provided "as is," without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Licensor does not warrant that the Software will be error-free or uninterrupted.</p>

            <h3 class="section-title">7. Limitation of Liability</h3>
            <p>Licensor shall not be liable for any damages, including but not limited to indirect, incidental, special, or consequential damages, arising out of the use or inability to use the Software.</p>

            <h3 class="section-title">8. No Legal Responsibility for Software Glitches</h3>
            <p>The developer is not responsible or liable for any damages, losses, or disruptions caused by software glitches, bugs, performance issues, or other software malfunctions. You acknowledge that the use of the Software is at your own risk and that no legal responsibility is assumed by the developer for any negative impact or harm arising from the use of the Software.</p>

            <h3 class="section-title">9. Data & Privacy</h3>
            <p>We respect your privacy. Data captured during activation is used solely for license verification and providing technical support via Telegram/Email.</p>

            <h3 class="section-title">10. Severability</h3>
            <p>If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>

            <h3 class="section-title">11. Entire Agreement</h3>
            <p>This Agreement constitutes the entire agreement between you and Licensor with respect to the Software and supersedes any prior agreements, understandings, or representations.</p>

            <div class="acceptance">
              <strong>User Declaration:</strong><br>
              "I have read all documents, understood the SEBI risk disclosures, and agree to the terms of use. I accept that I am solely responsible for my trading decisions and any financial outcomes resulting from the use of this software."
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Shark WebScalper by Dr. L T Trading Service. All rights reserved.</p>
              <p>This agreement is legally binding upon submission.</p>
              <p>Contact: +91 92222 92111 | saratbotfire@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 3. Generate PDF Blob
    const blob = Utilities.newBlob(htmlContent, 'text/html', 'Shark_Agreement.html');
    const pdf = blob.getAs('application/pdf').setName("Shark_EULA_" + mobile.replace(/[^0-9]/g, "") + ".pdf");

    // 4. Send Confirmation Email to Admin
    const adminEmails = "saratbotfire@gmail.com, luxmhjn@gmail.com";
    MailApp.sendEmail({
      to: adminEmails,
      subject: "🚀 Shark WebScalper - New License Activation - " + mobile,
      body: `A new user has accepted the Shark WebScalper terms.\n\n📱 Mobile: ${mobile}\n📧 Email: ${email}\n🔑 Flattrade ID: ${flattradeUserId}\n📅 Date: ${timestamp}\n\n⚠️ SEBI Risk Disclosure: User acknowledged 9/10 F&O traders incur losses\n\n✅ Please find the signed EULA attached.\n\n---\nDr. L T Trading Service\n+91 92222 92111`,
      attachments: [pdf]
    });

    // 5. Send Copy to User
    if (email && email !== "Unknown User") {
      MailApp.sendEmail({
        to: email,
        subject: "🦈 Shark WebScalper - Action Required: Read & Acknowledge to Start Activation",
        body: `Dear User,\n\nThank you for choosing Shark WebScalper!\n\n📱 Mobile: ${mobile}\n📧 Email: ${email}\n🔑 Flattrade ID: ${flattradeUserId}\n📅 Date: ${timestamp}\n\n✅ NEXT STEP REQUIRED:\nPlease find your signed End User License Agreement (EULA) attached.\n\n⚠️ IMPORTANT - READ CAREFULLY:\nYou MUST read the attached PDF document completely and send an acknowledgement reply to this email to proceed with your license activation.\n\n📋 TO COMPLETE ACTIVATION:\n1. Open and read the attached PDF (Shark_EULA_${mobile.replace(/[^0-9]/g, "")}.pdf)\n2. Reply to this email with: "I have read and understood the agreement"\n3. Your license will be activated within 24 hours of receiving your acknowledgement\n\n🚫 Without your email acknowledgement, your license activation cannot be processed.\n\n📞 Need Help?\n• WhatsApp Community: https://chat.whatsapp.com/FKOJ2xbDA93EbisBHSaVTF\n• Contact: +91 92222 92111\n\nHappy Trading!\n\n---\nDr. L T Trading Service\nShark WebScalper Team\n+91 92222 92111`,
        attachments: [pdf]
      });
    }

    // 5. Success Response
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "License activation triggered" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Error Handling
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

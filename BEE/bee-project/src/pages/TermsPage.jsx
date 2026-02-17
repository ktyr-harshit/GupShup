import PolicyPageLayout from "../components/PolicyPageLayout";

const termsSections = [
  {
    text: 'These Terms of Service ("Terms") govern your access to and use of our real-time chatting application, website, and related services (collectively, the "Service"). By creating an account or using the Service, you agree to these Terms.',
  },
  {
    heading: "1. Eligibility and Accounts",
    points: [
      "You must be at least 13 years old (or the minimum age required in your region) to use the Service.",
      "You are responsible for maintaining the security of your account credentials.",
      "You are responsible for all activity that occurs under your account.",
      "You must provide accurate information and keep your account details up to date.",
    ],
  },
  {
    heading: "2. Acceptable Use",
    intro: "You agree not to use the Service to:",
    points: [
      "Harass, threaten, abuse, or harm others.",
      "Share illegal, fraudulent, defamatory, or hateful content.",
      "Send spam, scams, malware, or unauthorized advertising.",
      "Impersonate another person or organization.",
      "Attempt to access accounts, systems, or data without authorization.",
      "Interfere with or disrupt the reliability or performance of the Service.",
    ],
  },
  {
    heading: "3. User Content",
    points: [
      'You retain ownership of messages, media, and other content you submit ("User Content").',
      "You grant us a limited license to host, store, process, and display User Content solely to operate and improve the Service.",
      "You are responsible for ensuring your User Content does not violate laws or third-party rights.",
    ],
  },
  {
    heading: "4. Moderation and Enforcement",
    points: [
      "We may review reports, investigate misuse, and take action to protect users and the Service.",
      "We may remove content or suspend or terminate accounts that violate these Terms or applicable law.",
      "We may cooperate with lawful requests from authorities when required.",
    ],
  },
  {
    heading: "5. Privacy and Data",
    text: "Your use of the Service is also governed by our Privacy Policy. By using the Service, you acknowledge that internet transmissions are never completely secure and that we cannot guarantee absolute security.",
  },
  {
    heading: "6. Service Availability",
    points: [
      "We strive to keep the Service available, but we do not guarantee uninterrupted or error-free operation.",
      "We may modify, suspend, or discontinue features at any time.",
      "We may perform maintenance that temporarily limits access.",
    ],
  },
  {
    heading: "7. Third-Party Services",
    text: "The Service may include integrations or links to third-party services. We are not responsible for third-party content, policies, or practices.",
  },
  {
    heading: "8. Termination",
    points: [
      "You may stop using the Service at any time.",
      "We may suspend or terminate your access if you violate these Terms or create risk for users or the Service.",
      "Upon termination, your right to use the Service ends immediately.",
    ],
  },
  {
    heading: "9. Disclaimers",
    text: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis to the fullest extent allowed by law, without warranties of any kind, express or implied.',
  },
  {
    heading: "10. Limitation of Liability",
    text: "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or loss of data, profits, or business arising from your use of the Service.",
  },
  {
    heading: "11. Indemnification",
    text: "You agree to indemnify and hold harmless the Service and its operators from claims, liabilities, damages, losses, and expenses arising out of your use of the Service, your User Content, or your violation of these Terms.",
  },
  {
    heading: "12. Changes to These Terms",
    text: "We may update these Terms from time to time. If we make material changes, we will update the date in this page and provide notice where required.",
  },
  {
    heading: "13. Governing Law",
    text: "These Terms are governed by the laws of the jurisdiction where the Service operator is established, without regard to conflict of law principles.",
  },
  {
    heading: "14. Contact",
    text: "For questions about these Terms, contact us at support@yourchatapp.com.",
  },
];

function TermsPage() {
  return <PolicyPageLayout title="Terms of Service" sections={termsSections} activePath="/terms" />;
}

export default TermsPage;

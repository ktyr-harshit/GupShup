import PolicyPageLayout from "../components/PolicyPageLayout";

const privacySections = [
  {
    text: 'This Privacy Policy explains how our real-time chatting application and related services (the "Service") collect, use, store, and share your information when you use the Service.',
  },
  {
    heading: "1. Information We Collect",
    points: [
      "Account information, such as username, email address, and encrypted password.",
      "Profile information you choose to provide.",
      "Message data, media, and other content you send through the Service.",
      "Device and usage information, including log data, browser type, and IP address.",
      "Cookies or similar technologies for authentication, preferences, and analytics.",
    ],
  },
  {
    heading: "2. How We Use Information",
    points: [
      "To provide, maintain, and improve the Service.",
      "To authenticate users and secure accounts.",
      "To deliver messages and support real-time communication features.",
      "To prevent abuse, spam, fraud, and other harmful activity.",
      "To communicate service updates, support responses, and policy changes.",
    ],
  },
  {
    heading: "3. Legal Bases for Processing",
    text: "Where required by law, we process your information based on legitimate interests, performance of a contract, compliance with legal obligations, and your consent (when applicable).",
  },
  {
    heading: "4. Sharing of Information",
    intro: "We may share information with:",
    points: [
      "Service providers that support hosting, analytics, security, and infrastructure.",
      "Authorities or legal entities when required by law or to protect rights and safety.",
      "Other parties in connection with a merger, acquisition, or business transfer.",
    ],
    text: "We do not sell your personal information.",
  },
  {
    heading: "5. Data Retention",
    text: "We keep personal information for as long as needed to provide the Service, comply with legal obligations, resolve disputes, and enforce agreements. Retention periods may vary by data type and legal requirements.",
  },
  {
    heading: "6. Data Security",
    text: "We use reasonable administrative, technical, and organizational safeguards to protect personal information. No system is perfectly secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "7. Your Rights and Choices",
    points: [
      "You can review and update certain account information from your profile settings.",
      "You may request access, correction, or deletion of personal information where applicable by law.",
      "You may disable cookies in your browser settings, though some features may not work properly.",
    ],
  },
  {
    heading: "8. Children's Privacy",
    text: "The Service is not intended for children under the minimum legal age in their jurisdiction. We do not knowingly collect personal information from children where prohibited by law.",
  },
  {
    heading: "9. International Data Transfers",
    text: "Your information may be processed in countries other than where you live. We take steps to ensure appropriate safeguards for cross-border data transfers where required.",
  },
  {
    heading: "10. Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. If material changes are made, we will update the date in this page and provide notice where required.",
  },
  {
    heading: "11. Contact",
    text: "If you have questions about this Privacy Policy, contact us at support@yourchatapp.com.",
  },
];

function PrivacyPolicyPage() {
  return <PolicyPageLayout title="Privacy Policy" sections={privacySections} activePath="/privacy-policy" />;
}

export default PrivacyPolicyPage;

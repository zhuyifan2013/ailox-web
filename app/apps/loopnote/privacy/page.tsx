import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Loopnote",
  description: "Privacy policy for Loopnote, an AI-powered note-taking app by Ailox.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f8fafc] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-300 text-sm transition-colors mb-10 inline-block"
        >
          ← Back to Ailox
        </Link>

        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-12">Last updated: April 13, 2025</p>

        <section className="space-y-10 text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>
              This Privacy Policy explains how Ailox ("we", "our", or "us") collects, uses, and
              protects your information when you use{" "}
              <strong className="text-white">Loopnote</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-white">Notes and content</strong> you create within the
                apps (stored locally on your device by default).
              </li>
              <li>
                <strong className="text-white">Photos and images</strong> you choose to attach to
                notes, selected from your photo library.
              </li>
              <li>
                <strong className="text-white">Account information</strong> (email address) if you
                create an account.
              </li>
              <li>
                <strong className="text-white">Device information</strong> such as a device
                identifier for anonymous usage.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">3. Camera and Photo Access</h2>
            <p>
              Our apps may request access to your device camera and photo library to allow you to
              attach images to your notes or records. We use this access solely to let you select
              or capture images that you explicitly choose to include. We do not access your camera
              or photos without your action, and we do not upload images to our servers without
              your knowledge.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and improve app functionality.</li>
              <li>
                To generate AI-powered summaries, insights, and suggestions (processed via our
                backend using your data).
              </li>
              <li>To store your data securely if you opt into cloud sync.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Storage and Security</h2>
            <p>
              By default, your data is stored locally on your device. If you use our cloud
              features, data is transmitted over encrypted connections (HTTPS) and stored
              securely. We do not sell your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>
              We may use the Anthropic API to power AI features. Data sent to AI services is used
              only to generate responses and is not used to train external models beyond what
              Anthropic's own policies permit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>
              Our apps are not directed at children under 13. We do not knowingly collect personal
              information from children under 13.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of significant
              changes by updating the date at the top of this page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:contact@favinci.cn"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@favinci.cn
              </a>
              .
            </p>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Ailox. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Delete Account — Ailox",
  description: "How to delete your Ailox account and what data will be removed.",
}

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f8fafc] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-300 text-sm transition-colors mb-10 inline-block"
        >
          ← Back to Ailox
        </Link>

        <h1 className="text-4xl font-bold mb-2">Delete Your Account</h1>
        <p className="text-slate-400 text-sm mb-12">Last updated: April 14, 2025</p>

        <section className="space-y-10 text-slate-300 leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">How to Delete Your Account</h2>
            <p className="mb-4">
              You can request account deletion at any time by following these steps:
            </p>
            <ol className="list-decimal list-inside space-y-3">
              <li>Open the app (Loopnote or Sprintr).</li>
              <li>
                Go to <strong className="text-white">Settings</strong> (tap the profile or menu
                icon in the top corner).
              </li>
              <li>
                Tap <strong className="text-white">Account</strong> →{" "}
                <strong className="text-white">Delete Account</strong>.
              </li>
              <li>Confirm your identity if prompted.</li>
              <li>
                Tap <strong className="text-white">Confirm Delete</strong>. Your account deletion
                request will be submitted immediately.
              </li>
            </ol>
            <p className="mt-4">
              Alternatively, you can request deletion by emailing us at{" "}
              <a
                href="mailto:contact@favinci.cn"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@favinci.cn
              </a>{" "}
              with the subject line <strong className="text-white">Account Deletion Request</strong>{" "}
              and the email address associated with your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">What Data Will Be Deleted</h2>
            <p className="mb-3">Upon account deletion, the following data will be permanently removed:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Your account profile and credentials (email, authentication tokens)</li>
              <li>All notes, entries, and content you created in the app</li>
              <li>AI-generated summaries, insights, and memories tied to your account</li>
              <li>Your settings and preferences</li>
              <li>Any uploaded images or attachments</li>
              <li>Usage history and activity logs</li>
            </ul>
            <p className="mt-4">
              Data stored locally on your device (e.g., in offline mode) is not automatically
              removed. You can delete this by uninstalling the app.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">When Deletion Takes Effect</h2>
            <p>
              Account deletion is processed within{" "}
              <strong className="text-white">30 days</strong> of your request. During this period,
              your account will be deactivated and you will not be able to log in. After 30 days,
              all data listed above will be permanently and irreversibly deleted from our servers.
            </p>
            <p className="mt-3">
              If you change your mind, you may cancel the deletion request by contacting us at{" "}
              <a
                href="mailto:contact@favinci.cn"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@favinci.cn
              </a>{" "}
              within the 30-day window.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions or need assistance with account deletion, please reach out:
            </p>
            <p className="mt-3">
              Email:{" "}
              <a
                href="mailto:contact@favinci.cn"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@favinci.cn
              </a>
            </p>
            <p className="mt-1 text-slate-400 text-sm">
              We typically respond within 2 business days.
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

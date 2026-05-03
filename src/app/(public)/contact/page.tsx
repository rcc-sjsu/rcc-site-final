export default function ContactPage() {
  return (
    <main className="flex flex-col items-center px-4 py-16 relative">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Fill out this form if you would like reach out to the RCC team!</p>

      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="fullName" className="block mb-1 text-sm font-medium">
              Full Name <span className="text-red-500">(Required)</span>
            </label>
            <input id="fullName" type="text" className="w-full border border-gray-400 rounded px-3 py-2" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email <span className="text-red-500">(Required)</span>
            </label>
            <input id="email" type="email" className="w-full border border-gray-400 rounded px-3 py-2" />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Message <span className="text-red-500">(Required)</span>
            </label>
            <textarea id="message" rows={4} className="w-full border border-gray-400 rounded px-3 py-2" />
          </div>

          <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded mt-2">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
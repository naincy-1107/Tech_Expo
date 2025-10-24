export default function Pricing() {
  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
      <p className="mt-4 text-gray-600">Choose a plan that fits your learning journey.</p>
      
      <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 border rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="mt-2 text-gray-600">Access to basic algorithm visualizations.</p>
          <p className="mt-4 font-bold text-2xl">$0</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Started</button>
        </div>
        
        <div className="p-6 border rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="mt-2 text-gray-600">Advanced visualizations + quizzes.</p>
          <p className="mt-4 font-bold text-2xl">$9/mo</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Subscribe</button>
        </div>

        <div className="p-6 border rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <p className="mt-2 text-gray-600">For teams, classrooms, and companies.</p>
          <p className="mt-4 font-bold text-2xl">Custom</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Contact Us</button>
        </div>
      </div>
    </section>
  );
}

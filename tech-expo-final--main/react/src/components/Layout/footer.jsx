export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-700">
      © {new Date().getFullYear()} <span className="font-semibold text-gray-300">CODELEARN</span> | Built with{" "}
      <span className="text-blue-400">React</span> + <span className="text-teal-400">Tailwind CSS</span>
    </footer>
  );
}

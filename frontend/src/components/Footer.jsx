// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t shadow-sm text-center py-4 mt-10">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Police Portal — All rights reserved.
      </p>
    </footer>
  );
}

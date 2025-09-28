const Header = () => (
  <header className="w-full p-6 flex justify-between items-center bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
    <h1 className="text-2xl font-display font-bold">Zam Tutor</h1>
    <nav>
      <button className="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition">Get Started</button>
    </nav>
  </header>
);

export default Header;
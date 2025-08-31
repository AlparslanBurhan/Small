import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full flex justify-center pt-6">
            <div className="bg-gray-800 text-white px-20 py-4 flex justify-between items-center w-full max-w-6xl rounded-lg shadow-md">
                <h1 className="text-xl font-bold">Small</h1>
                <nav>
                    <Link href="/">
                        Anasayfa
                    </Link>
                </nav>
            </div>
        </header>
    );
}

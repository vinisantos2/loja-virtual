import AuthOptions from "./AuthOptions";

export default function Header() {
    return (
        <header className="relative h-16 shadow-md flex items-center px-4">
            <h1 className="text-xl font-bold">Minha Loja</h1>
            <AuthOptions />
        </header>
    );
}

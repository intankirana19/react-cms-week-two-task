import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white flex flex-col items-center justify-center p-6 rounded shadow w-auto space-y-4">
                <h1 className="text-5xl font-bold text-center text-primary-200">
                    404
                </h1>

                <p className="text-xl text-center">
                    Halaman yang anda cari tidak ditemukan.
                </p>

                <Link to="/" className="bg-primary-200 text-white text-center w-full p-2 rounded hover:bg-primary-100 cursor-pointer">
                    Kembali
                </Link>
            </div>
        </div>
    )
}

export default NotFound
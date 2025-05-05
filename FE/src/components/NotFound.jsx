export default function NotFound(){
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Oops! Page Not Found</p>
            <p className="text-lg">But don't worry, something amazing is coming soon...</p>
            <button 
                className="mt-6 px-6 py-2 bg-white text-green-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                onClick={() => window.location.href = '/'}
            >
                Go Back Home
            </button>
        </div>
    )

}
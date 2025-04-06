export default function Error({e}){
    console.log(e.message)
    return (
        <div className="flex px-4 py-2">
            <p className="text-3xl">There is something wrong, Please contact administrator!</p>
        </div>
    )

}
import { useState } from 'react'

function Polisher() {

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)

    const improveBullet = async () => {

        if (!input) return

        setLoading(true)

        try {

            const response = await fetch('https://ai-bullet-point-polisher-backend.vercel.app/api/polish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input })
            })

            const data = await response.json()

            console.log('Improved Bullet Points:', data)
            setOutput(data.polishedBullet)


        } catch (error) {
            console.error('Error improving bullet points:', error)
        }

        setLoading(false)
    }

    return (
        <>
            <h1 className="text-center mt-8 text-3xl font-bold">AI CV Bullet Point Polisher</h1>

            <div className='w-full flex justify-center mt-4 items-center gap-4'>
                <input
                    name='input'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your bullet points here..."
                    className="w-full p-4 mt-4 border rounded-lg resize-none md:w-1/2"
                />
                <button
                    onClick={() => {
                        setInput('')
                        setOutput('')
                    }}
                    className="p-4 mt-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                    Clear
                </button>
            </div>

            <div className='w-full flex justify-center mt-4'>
                <button
                    onClick={improveBullet}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {loading ? 'Polishing...' : 'Polish'}
                </button>
            </div>

            {output && (
                <div>
                    <h2 className='text-left my-4 mx-4 font-bold'>Polished Bullet Point</h2>
                    <p className='text-left my-4 mx-4'>{output}</p>
                </div>
            )}

        </>
    )
}

export default Polisher
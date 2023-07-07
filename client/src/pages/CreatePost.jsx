import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { preview } from "../assets"
import { randomSurpriseMe } from '../utils'
import { FormField, Loader, SubmitButton, VariationButton } from '../components'

const CreatePost = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        prompt: "",
        photo1: "",
        photo2: "",
        photo3: "",
        photo4: "",
    })
    const [generatingImg, setGeneratingImg] = useState(false)

    const handleSubmit = async (e) => {
        const imgNum = e.target.dataset.value
        if(!(form.name && form.prompt && form[`photo${imgNum}`])) return alert("some fields are missing")
        const photo = form[`photo${imgNum}`]
        const { name, prompt } = form
        setGeneratingImg(true)
        try {
            const response = await fetch("https://midjourney-clone.onrender.com/api/v1/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, prompt, photo })
            })

            await response.json()
            navigate("/")
        } catch (err) {
            alert(err)
        } finally {
            setGeneratingImg(false)
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSurpriseMe = (e) => {
        setForm({ ...form, prompt: randomSurpriseMe(form.prompt) })
    }

    const generateImage = async () => {
        if(!form.prompt) return alert("Please enter prompt")

        try {
            setGeneratingImg(true)
            const response = await fetch("https://midjourney-clone.onrender.com/api/v1/midjourney", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: form.prompt})
            })
            if(!response.ok) throw new Error("invalid prompt")
            const data = await response.json()
            setForm({
                ...form,
                photo1: `data:image/png;base64,${data.images[0].b64_json}`,
                photo2: `data:image/png;base64,${data.images[1].b64_json}`,
                photo3: `data:image/png;base64,${data.images[2].b64_json}`,
                photo4: `data:image/png;base64,${data.images[3].b64_json}`,
            })
        } catch (err) {
            alert(err)
        } finally {
            setGeneratingImg(false)
        }
    }

    const generateV = async (e) => {
        try {
            setGeneratingImg(true)
            const response = await fetch("https://midjourney-clone.onrender.com/api/v1/midjourney/variations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ photo: form[`photo${e.target.dataset.value}`] })
            })

            const data = await response.json()
            setForm({
                ...form,
                photo1: `data:image/png;base64,${data.images[0].b64_json}`,
                photo2: `data:image/png;base64,${data.images[1].b64_json}`,
                photo3: `data:image/png;base64,${data.images[2].b64_json}`,
                photo4: `data:image/png;base64,${data.images[3].b64_json}`,
            })
        } catch(err) {
            alert(err)
        } finally {
            setGeneratingImg(false)
        }
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                    Create an AI generated Image
                </p>
            </div>

            <form action="" className='mt-16 max-w-3xl' onSubmit={() => console.log("submit from upload button")}>
                <div className="flex flex-col gap-5">
                    <FormField 
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Elon Musk"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField 
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder={randomSurpriseMe()}
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className='relative bg-gray-50 border border-gray-300  w-full p-2 h-58 flex justify-center items-center'>
                        {form.photo1 ? (
                            <React.Fragment>
                                <div className='w-1/4 h-auto'>
                                    <img 
                                        src={form.photo1}
                                        alt={form.prompt}
                                        className="px-1 object-contain object-center rounded-xl"
                                    />
                                </div>
                                <div className='w-1/4 h-auto'>
                                    <img 
                                        src={form.photo2}
                                        alt={form.prompt}
                                        className="px-1 object-contain object-center rounded-xl"
                                    />
                                </div>
                                <div className='w-1/4 h-auto'>
                                    <img 
                                        src={form.photo3}
                                        alt={form.prompt}
                                        className="px-1 object-contain object-center rounded-xl"
                                    />
                                </div>
                                <div className='w-1/4 h-auto'>
                                    <img 
                                        src={form.photo4}
                                        alt={form.prompt}
                                        className="px-1 object-contain object-center rounded-xl"
                                    />
                                </div>
                            </React.Fragment>
                        ) : (
                            <img 
                                src={preview} 
                                alt="preview"
                                className='h-64 object-contain opacity-40'
                            />
                        )}

                        { generatingImg && (
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button
                        type='button'
                        onClick={generateImage}
                        disabled={ generatingImg ? true : false }
                        className=" disabled:bg-gray-600 text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        { generatingImg ? "Generating..." : "Generate Image"}
                    </button>
                </div>
                { form.photo1 && (
                    <React.Fragment>
                        <div className="mt-1 flex flex-col">
                            <p className='mt-2 text-[#666E75] text-[14px] w-full'>
                                Create a variation of one of your images
                            </p>
                            <strong>Due to the OpenAI new API policy, you must wait <b>1 minute</b> between each request!</strong>
                            <div className="flex gap-1">
                                <VariationButton
                                    value={"1"}
                                    onClickHandler={generateV}
                                    disabledCondition={generatingImg}
                                />
                                <VariationButton
                                    value={"2"}
                                    onClickHandler={generateV}
                                    disabledCondition={generatingImg}
                                />
                                <VariationButton
                                    value={"3"}
                                    onClickHandler={generateV}
                                    disabledCondition={generatingImg}
                                />
                                <VariationButton
                                    value={"4"}
                                    onClickHandler={generateV}
                                    disabledCondition={generatingImg}
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className='mt-2 text-[#666E75] text-[14px]'>
                                upload one of your images to the server!
                            </p>
                            <div className='flex gap-1'>
                                <SubmitButton
                                    generatingImg={generatingImg}
                                    onClickHandler={handleSubmit}
                                    value={"1"}
                                />
                                <SubmitButton
                                    generatingImg={generatingImg}
                                    onClickHandler={handleSubmit}
                                    value={"2"}
                                />
                                <SubmitButton
                                    generatingImg={generatingImg}
                                    onClickHandler={handleSubmit}
                                    value={"3"}
                                />
                                <SubmitButton
                                    generatingImg={generatingImg}
                                    onClickHandler={handleSubmit}
                                    value={"4"}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                ) }

            </form>
        </section>
    )
}

export default CreatePost
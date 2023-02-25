import React, { useState, useEffect } from 'react'

import { Card, FormField, Loader, RenderCards } from "../components"

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)
    
    const fetchPosts = async () => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/api/v1/post", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            if(response.ok) {
                const result = await response.json()
                setPosts(result.data.reverse())
            }
        } catch(err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }
    
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)
        setSearchTimeout(
            setTimeout(()=> {
                const searchResults = posts.filter((post) => { 
                    return post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
                    post.name.toLowerCase().includes(searchText.toLowerCase())
                })
                setSearchResults(searchResults)
                setLoading(false)
            }, 500)
        )
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div>
            <section className='max-w-7xl mx-auto'>
                <div>
                    <h1 className="font-extrabold text-[#222328] text-[32px]">Community Showcase</h1>
                    <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                        Browse through a collection of AI generated Images
                    </p>
                </div>

                <div className='mt-16'>
                    <FormField
                        labelName="Search Posts"
                        type="text"
                        name="text"
                        placeholder="Search by name of author, or keyword on image prompt"
                        value={searchText}
                        handleChange={handleSearchChange}
                    />
                </div>

                <div className='mt-16'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        <React.Fragment>
                            {searchText && (
                                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                        Showing results for <span className='text-[#222328]'>{searchText}</span>
                                    </h2>
                            )}
                            <div className='grid lg:grid-cols-4 sm:grids-cols-3 xs:grids-cols-2 grid-cols-1 gap-3'>
                                {searchText ? (
                                    <RenderCards 
                                        data={searchResults}
                                        title="No search results found"
                                    />
                                ) : (
                                    <RenderCards
                                        data={posts}
                                        title="No posts found"
                                    />
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home
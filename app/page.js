"use client"
import { useState } from "react";
import axios from "axios"
// https://api.github.com/users/naveed-rana/
export default function page() {
    const [inputText, setInputText] = useState("")
    const [data, setData] = useState(null)
    const [followers, setFollowers] = useState([])

    const inputHandler = (e) => {
        setInputText(e.target.value)
        console.log(inputText);
    }

    const searcHandler = async () => {
        let getData = await axios.get(`https://api.github.com/users/${inputText}`)
        setData(getData.data)
        console.log(getData.data)
    }

    const followersHandler = async () => {
        let followersData = await axios.get(data.followers_url)
        setFollowers(followersData.data)
        console.log(followersData.data);
    }

    return (
        <div>
            <input onChange={inputHandler} type="text" />
            <button onClick={searcHandler}>Search</button> <br />
            {data && <div>
                <img src={data.avatar_url} alt="" width="300" />
                <p>Bio: {data.bio}</p>
                <p>Followers - {data.followers}</p>
                <p>Following - {data.following}</p>
                <button onClick={followersHandler}>See Followers</button>
                <hr />
            </div>}

            <table>
                <tr>
                    <td>
                        Username
                    </td>
                    <td>
                        Image
                    </td>
                    <td>
                        Github-url
                    </td>
                </tr>
                {
                followers.map((elements) => {
                    return (
                        <tr>
                            <td>{elements.login}</td>
                            <td><img src={elements.avatar_url} width="100" alt="" /></td>
                            <td>{elements.url}</td>
                        </tr>


                    )
                })
            }

            </table>

           





        </div>
    )
}

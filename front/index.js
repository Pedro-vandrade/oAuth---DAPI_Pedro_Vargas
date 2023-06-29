import axios from "axios";
import { redirect } from "express/lib/response";
import queryString from "query-string";

function redirectToGithub() {
    const GITHUB_URL = "https://github.com/login/oauth/authorize";
    const params = {
        response_type: 'code',
        scope: 'user',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URL,
        state: 'test-t5'
    }
    const queryString = qs.stringify(params);
    const authURL = `${GITHUB_URL}?${queryString}`;
    window.location.href = authURL;
}

window.onload = async () => {
    document.querySelector(".login").addEventListener("click", redirectToGithub);

    const {code} = qs.parseUrl(window.location.href).query;
    if(code){
        try{
            const response = await axios.post(`${process.env.BACK_END_UR}/login`, {code});
            const user = (await response).data;
            console.log(user);
        } catch (error) {
            alert("Ops, deu algo errado.")
            console.log("err", err);
        }
    }
}
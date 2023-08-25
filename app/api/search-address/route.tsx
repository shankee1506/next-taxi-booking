import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"
const BASE1_URL='https://api.mapbox.com/geocoding/v5/mapbox.places/'
export async function GET(request: any) {

    const { searchParams } = new URL(request.url)
    
    const searchText = searchParams.get('q')

    const res = await fetch(BASE_URL+'?q='+searchText+'?language=en&limit=6&session_token=01eb0504-7ce3-4b81-88a2-b39ee7005147'
        + "&access_token=" + process.env.MAPBOX_ACCESS_TOKEN,
        {
            headers:{
                "Content-Type": "application/json"
            }
        })
    
    const searchResult = await res.json();
    return NextResponse.json(searchResult)
}
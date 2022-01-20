import { GetServerSideProps } from 'next'
import React from 'react'

const Lol = () => {
    return (
        <Main lol='2321' cat={321} />
    )
}

interface Props {
    lol: string
    cat: number
    data: { near_earth_objects: {} }
}

const Main: React.FC<Props> = ({ lol, cat, data }) => {
    return (
        <h1>main lol props {lol} {cat} {data.near_earth_objects}</h1>
    )
}
export const getServerSideProps: GetServerSideProps = async () {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-03-03&end_date=2021-03-03&api_key=API_KEY`)
    const data = await res.json()

    return { Props: { data } }
}

export default Lol

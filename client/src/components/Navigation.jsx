import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Bolt Bucket 🏎️</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize Car</a></li>
                <li><a href='/customcars' role='button'>View All Cars</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
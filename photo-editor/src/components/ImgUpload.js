import React from 'react'

const ImgUpload = ({handleImage}) => {
    return (
        <div className="file-container">
            <form>
                <label>
                    <input className="input-hide" type="file" onChange={handleImage}/>
                    <span className="plus">+</span>
                </label>
            </form>
        </div>
    )
}

export default ImgUpload

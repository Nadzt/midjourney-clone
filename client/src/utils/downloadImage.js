import FileSaver from "file-saver"

const downloadImage = async (_id, photo) => {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

export default downloadImage
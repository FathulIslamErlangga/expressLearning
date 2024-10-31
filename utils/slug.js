const createSlug = (name) => {
return name 
.toLowerCase()
.replace(/\s+/g, '')
}

export default createSlug
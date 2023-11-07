import {useState} from "react"
import {useNavigate} from "react-router-dom"

function NewMovieForm({addMovie, updateFormData}) {

  const [submittedForm, setSubmittedForm] = useState(false)
  const navigate = useNavigate()

  if(submittedForm){
    navigate('/movies')
  }

    return (
      <div className="new-movie-form">
        <h2>New Ukrainian Movie</h2>
        <form onSubmit={(event) => {
            addMovie(event)
            setSubmittedForm(true)
        }}>
            <input onChange={updateFormData} type="text" name="name" placeholder="Movie name" required/>
            <input onChange={updateFormData} type="text" name="year" placeholder="Year" required/>
            <div name='genre' onChange={updateFormData} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ flexBasis: '25%', marginBottom: '10px' }}>
                <input type='checkbox' value="Action" /> Action
                <input type='checkbox' value="Drama" /> Drama
                <input type='checkbox' value="Comedy" /> Comedy
                <input type='checkbox' value="Horror" /> Horror
            </div>
            <div style={{ flexBasis: '25%', marginBottom: '10px' }}>
                <input type='checkbox' value="War" /> War
                <input type='checkbox' value="Documentary" /> Documentary
                <input type='checkbox' value="Crime" /> Crime
                <input type='checkbox' value="History" /> History
            </div>
            <div style={{ flexBasis: '25%', marginBottom: '10px' }}>
                <input type='checkbox' value="Adventure" /> Adventure
                <input type='checkbox' value="Family" /> Family
                <input type='checkbox' value="Thriller" /> Thriller
                <input type='checkbox' value="Fantasy" /> Fantasy
            </div>
            <div style={{ flexBasis: '25%', marginBottom: '10px' }}>
                <input type='checkbox' value="Sport" /> Sport
            </div>
            </div>
            <input onChange={updateFormData} type="text" name="description" placeholder="Movie Description" required/>
            <input onChange={updateFormData} type="text" name="detailed_description" placeholder="Movie Detailed Description" required/>
            <input onChange={updateFormData} type="text" name="image" placeholder="Movie Image URL" required/>
            <input onChange={updateFormData} type="text" name="platform" placeholder="Platform" />
            <input onChange={updateFormData} type="text" name="platform_link" placeholder="Platform Link" />
            <button type="submit">Add movie</button>
        </form>
      </div>
    );
  }
  export default NewMovieForm;
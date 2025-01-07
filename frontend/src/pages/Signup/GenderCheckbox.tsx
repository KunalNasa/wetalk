type props = { 
    handleGenderInput : (data : string) => void,
    selectedGender : string
}
const GenderCheckbox = (props : props) => {
    const {handleGenderInput, selectedGender} = props;
  return (
    <div className="flex gap-5 py-2">
        <div className="space-x-2">
            <label htmlFor="">Male</label>
            <input 
            checked={selectedGender === "Male"}
            onChange={() => {handleGenderInput("Male")}}
            type="checkbox"
            />
        </div>
        <div className="space-x-2">
        <label htmlFor="">Female</label>
            <input 
            checked={selectedGender === "Female"}
            onChange={() => {handleGenderInput("Female")}}
            type="checkbox"
             />
        </div>

    </div>
  )
}

export default GenderCheckbox

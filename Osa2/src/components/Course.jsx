

const Total = ({parts}) => {

    // let sum = 0
    // parts.forEach(p => sum+=p.exercises)
  
    const partsamount = parts.map(part => part.exercises)
    const total = partsamount.reduce((a, c) => a + c)
  
    console.log(total)
    return (
      <div>
        <p>Total of exercises {total}</p>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    
    return (
      <div>
        {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      
      </div>
    )
  }
  
  const Course = ({courses}) => {
    console.log('it kinda works')
    return(
        <div>
          {courses.map(course => 
            <><Header key={course.id} course={course.name} /><Content parts={course.parts} /><Total parts={course.parts} /></>
            )}
        </div>
    )
  }

  export default Course
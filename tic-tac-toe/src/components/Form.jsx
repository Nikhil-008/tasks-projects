export function Form() {
  return(
    <form>
      <div>
        <label htmlFor="username">username</label>
        <input id ="username" type="text" placeholder="Username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="password" placeholder="Password" />
      </div>
      <div>
        <label htmlFor="displayName">Display Name</label>
        <input id="displayName" type="text" placeholder="Display Name" />
      </div>
    </form>
  )
}
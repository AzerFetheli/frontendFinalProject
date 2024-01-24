import React, { useEffect, useState } from 'react'
import OurStafTable from './OurStaffTable'
import CreateAdmin from './CreateAdmin'
import "./Staff.css"
import { API } from '../../../../../axios'

export default function OurStaf({}) {
  const [createAdmin, setCreateAdmin] = useState(false)
  const [admin, setAdmin] = useState([])

  const getUser = () => {
    API.get("/dashboard/users")
      .then((res) => {
        setAdmin(res.data)
        console.log(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])


  const handleAdmin = () => {
    setCreateAdmin(!createAdmin);
  };

  return (
    <>
      <button onClick={handleAdmin}>Create Admin</button>
      <OurStafTable data={admin.data} getUser={getUser} />
      < CreateAdmin handleAdmin={handleAdmin} createAdmin={createAdmin} getUser={getUser} />
    </>
  )
}

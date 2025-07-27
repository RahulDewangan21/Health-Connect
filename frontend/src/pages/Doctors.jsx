import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-4 sm:px-10 py-6">
      <p className="text-gray-600 text-center sm:text-left">Browse through the doctors speciality.</p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-orange-500 text-white' : ''}`}
        >
          Filters
        </button>

        <div className={`flex-wrap gap-3 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist',
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`px-4 py-2 border border-gray-300 rounded transition-all cursor-pointer hover:bg-orange-500 hover:text-white hover:scale-105 duration-300 ${
                speciality === spec ? 'bg-orange-200 text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filterDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            key={index}
          >
            <img className="bg-[#EAEFFF] w-full h-48 object-cover" src={item.image} alt="" />
            <div className="p-4">
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium mt-1">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors


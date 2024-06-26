import React, { Fragment,  useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import Avatar from 'react-avatar-edit'
import axios from '../../Axios'
import { useDispatch } from 'react-redux'
import { updatePicture } from '../../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const UpdateProfilePic = ({modal,closeModal,id}) => {

  const [load, setload] = useState(false)
  const [preview, setpreview] = useState(null)
  const cancelButtonRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCrop = view =>{
    setpreview(view)
  }
  const onClose=() =>{
    setpreview(null)
  }
  const update =async ()=>{
    setload(true)
    try{
      const res = await axios.post(`/updatePicture/${id}`,{image : preview})
      dispatch(updatePicture(res.data))
      closeModal()
      navigate('/profile')
    }catch(err){
      console.log(err);
    }
    setload(false)
  }
  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                   
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Update Profile Picture
                      </Dialog.Title>
                      <div className="mt-2">
                        <Avatar 
                          width={400}
                          height={300}
                          onCrop={onCrop }
                          onClose={onClose}
                          
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {load ? <BeatLoader color="#6366F1" style={{ display:"flex", justifyContent:"center", alignItems:"center"}}/> :
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={ update}
                  >
                    Update
                  </button> }
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
  
export default UpdateProfilePic
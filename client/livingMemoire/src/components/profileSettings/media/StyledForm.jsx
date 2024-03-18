import React from 'react'
import '../../../styles/mediaForm.css';

export default function StyledForm() {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[520px] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">New post</h3>
          <div className="mt-2 px-7 py-3">
            <form action="#" className="space-y-6" method="POST">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type of content:</label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        checked
                        className="rounded text-yellow-500 focus:ring-yellow-500 border-gray-300"
                        type="checkbox"
                      />
                      <span className="ml-2">Photos</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        className="rounded text-yellow-500 focus:ring-yellow-500 border-gray-300"
                        type="checkbox"
                      />
                      <span className="ml-2">Video</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        className="rounded text-yellow-500 focus:ring-yellow-500 border-gray-300"
                        type="checkbox"
                      />
                      <span className="ml-2">Voice note</span>
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Images:</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          htmlFor="file-upload"
                        >
                          <span>Drag images or click to upload images</span>
                          <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                    Title:
                  </label>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    id="title"
                    name="title"
                    placeholder=""
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    id="description"
                    name="description"
                    placeholder=""
                    rows="3"
                  />
                </div>
              </div>
              <div>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

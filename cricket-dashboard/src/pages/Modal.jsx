import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example(props) {
  const {show, setShow, player } = props;
  return (
    <>

      <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{player.fullname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm mx-auto text-center border hover:shadow-xl transition duration-300">
      <img
        src={player.image_path}
        alt={player.fullname}
        className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
      />
      <h2 className="text-2xl font-bold text-blue-700">{player.fullname}</h2>

      <div className="flex items-center justify-center gap-2 my-2">
        <img
          src={player.country_image_path}
          alt={player.country_name}
          className="w-6 h-6"
        />
        <span className="text-gray-600">{player.country_name}</span>
      </div>

      <div className="text-sm text-gray-700 mt-4 space-y-1">
        <p><strong>DOB:</strong> {player.dateofbirth}</p>
        <p><strong>Gender:</strong> {player.gender === 'm' ? 'Male' : 'Female'}</p>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Batting Style:</strong> {player.battingstyle}</p>
        <p><strong>Bowling Style:</strong> {player.bowlingstyle}</p>
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;


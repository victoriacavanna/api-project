import express from 'express';
import User from '../models/user.js';
const router = express.Router();

//GET listar todos los usuarios
router.get('/users', (req, res) => {
    User.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json({ message: err.message }));
});

//GET obtener usuario por id
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json({ message: err.message }));
});

//POST crear usuario
router.post('/create', (req, res) => {
    const { name, age, email } = req.body;
    const newUser = new User({ name, age, email });

    newUser.save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json({ message: err.message }));
});

//PUT actualizar usuario
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, email } = req.body;

    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.name = name || user.name;
            user.age = age || user.age;
            user.email = email || user.email;

            return user.save();
        })
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => res.status(400).json({ message: err.message }));

})

//DELETE eliminar usuario por id
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    User.findOneAndDelete({ _id: id })
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully', deletedUser });
        })
        .catch((err) => res.status(400).json({ message: err.message }));
});

export default router;
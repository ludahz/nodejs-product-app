import Cart from './cart'
import CartItem from './cartItem'
import Order from './order'
import Product from './product'
import User from './user'

// Define your associations
User.hasMany(Product) // A User can have many Products
User.hasOne(Cart) // A User can have one Cart

CartItem.belongsTo(Cart) // A CartItem belongs to a Cart
Cart.hasMany(CartItem)

Cart.belongsTo(User) // A Cart belongs to a User

CartItem.belongsToMany(Product, {
	through: 'CartItemProducts',
})
Product.belongsToMany(CartItem, {
	through: 'CartItemProducts',
})
Product.belongsTo(User, {
	constraints: true,
	onDelete: 'CASCADE',
})

Order.belongsTo(User)
User.hasMany(Order)

// Define the association between Order and Product
Order.belongsToMany(Product, {
	through: 'OrderProducts', // Use a join table for the many-to-many relationship
})

Product.belongsToMany(Order, {
	through: 'OrderProducts', // Use the same join table
})

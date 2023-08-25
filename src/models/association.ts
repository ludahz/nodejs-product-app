import Cart from './cart'
import CartItem from './cartItem'
import Product from './product'
import User from './user'

// Define your associations
// User.hasMany(CartItem)
// User.hasMany(Product)
// CartItem.belongsTo(User)

// Define your associations
User.hasMany(Product) // A User can have many Products
User.hasOne(Cart) // A User can have one Cart

CartItem.belongsTo(Cart) // A CartItem belongs to a Cart
Cart.hasMany(CartItem)

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

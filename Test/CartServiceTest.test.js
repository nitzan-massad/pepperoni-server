/* eslint-disable no-undef */
import assert from 'assert'
import { AddToCart, getCartItemsForUser } from '../Services/CartService.js'

const allMenuItems = ['big pizza', 'small pizza', 'cola', 'water', 'garlic bread']
const partOfMenuItems = ['big pizza', 'small pizza']
const someMoreItems = ['holy water']
const newUser1 = 'newUser1'
const newUser2 = 'newUser2'
const newUser3 = 'newUser3'
const newUser4 = 'newUser4'
const newUser5 = 'newUser5'
const newUser6 = 'newUser6'

describe('Test AddToCart function', () => {
  it('add new two users items', () => {
    AddToCart(newUser1, allMenuItems)
    AddToCart(newUser2, partOfMenuItems)
    assert(JSON.stringify(getCartItemsForUser(newUser1)) === JSON.stringify(allMenuItems) &&
        JSON.stringify(getCartItemsForUser(newUser2)) === JSON.stringify(partOfMenuItems))
  })
  it('add new two users items and then adding more items to the first one', () => {
    AddToCart(newUser3, allMenuItems)
    AddToCart(newUser4, partOfMenuItems)
    AddToCart(newUser3, someMoreItems)
    assert(JSON.stringify(getCartItemsForUser(newUser3)) === JSON.stringify([...allMenuItems, ...someMoreItems]) &&
            JSON.stringify(getCartItemsForUser(newUser4)) === JSON.stringify(partOfMenuItems))
  })
  it('add new two users items and then adding duplicates items to the first one', () => {
    AddToCart(newUser5, allMenuItems)
    AddToCart(newUser6, partOfMenuItems)
    AddToCart(newUser5, partOfMenuItems)
    assert(JSON.stringify(getCartItemsForUser(newUser5)) === JSON.stringify([...allMenuItems, ...partOfMenuItems]) &&
            JSON.stringify(getCartItemsForUser(newUser6)) === JSON.stringify(partOfMenuItems))
  })
})

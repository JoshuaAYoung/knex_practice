const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service object', () => {
  let db
  let testItems = [
    {
      id: 1,
      name: 'First test item',
      date_added: new Date('2029-01-22T04:00:00.000Z'),
      price: "5.75",
      checked: true,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Second test item',
      date_added: new Date('2029-01-22T06:00:00.000Z'),
      price: "11.25",
      checked: false,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Third test item',
      date_added: new Date('2029-01-22T09:00:00.000Z'),
      price: "13.14",
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 4,
      name: 'Fourth test item',
      date_added: new Date('2029-01-22T00:00:00.000Z'),
      price: "3.45",
      checked: true,
      category: 'Lunch'
    }
  ]

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before('clean db', () => db('shopping_list').truncate());
  afterEach('clean db', () => db('shopping_list').truncate());
  after('destroy db', () => db.destroy());

  describe('getAllItems', () => {
    it('returns an empty array', () => {
      return ShoppingListService
        .getAllItems(db)
        .then(items => expect(items).to.eql([]))
    });

    context('with data present', () => {
      beforeEach('insert test items', () =>
        db('shopping_list')
          .insert(testItems)
      );

      it('returns all test items', () => {
        return ShoppingListService
          .getAllItems(db)
          .then(actual => expect(actual).to.eql(testItems.map(item => ({
            ...item,
            date_added: new Date(item.date_added)
          }))));
      });
    });
  });

  describe('insertItem()', () => {
    it('inserts an item into the db and returns an item with a new id', () => {
      const newItem = {
        name: 'Toenail clippings',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        price: '10000.00',
        checked: true,
        category: 'Snack'
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            date_added: newItem.date_added,
            price: newItem.price,
            checked: newItem.checked,
            category: newItem.category
          });
        });
    });
    it('throws not-null constraint error if checked is note provided', () => {
      const newItem = {
        name: 'Eyeballs',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        price: '2.10',
        category: 'Lunch'
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(
          () => expect.fail('db should throw error'),
          err => expect(err.message).to.include('not-null')
        );
    });
  });

  describe('deleteItem()', () => {
    it('should return 0 rows affected', () => {
      return ShoppingListService
        .deleteItem(db, 999)
        .then(rowsAffected => expect(rowsAffected).to.eq(0));
    })

    context('with data present', () => {
      before('insert items', () =>
        db('shopping_list')
          .insert(testItems)
      );

      it('should return 1 row affected and record is removed from db', () => {
        const deletedItemId = 1;

        return ShoppingListService
          .deleteItem(db, deletedItemId)
          .then(rowsAffected => {
            expect(rowsAffected).to.eq(1);
            return db('shopping_list').select('*');
          })
          .then(actual => {
            const expected = testItems.filter(a => a.id !== deletedItemId);
            expect(actual).to.eql(expected);
          });
      });
    });
  });


  describe('updateItem', () => {
    it('should return 0 rows affected', () => {
      return ShoppingListService
        .updateItem(db, 753, { name: 'hairball' })
        .then(rowsAffected => expect(rowsAffected).to.eq(0));
    });

    context('with data present', () => {
      before('insert items', () =>
        db('shopping_list')
          .insert(testItems)
      );

      it('should successfully update an item', () => {
        const updatedItemId = 1;
        const testItem = testItems.find(a => a.id === updatedItemId);
        const updatedItem = { ...testItem, name: 'hairball' };

        return ShoppingListService
          .updateItem(db, updatedItemId, updatedItem)
          .then(rowsAffected => {
            expect(rowsAffected).to.eq(1)
            return db('shopping_list').select('*').where({ id: updatedItemId }).first();
          })
          .then(article => {
            expect(article).to.eql(updatedItem);
          });
      });
    });
  });
});

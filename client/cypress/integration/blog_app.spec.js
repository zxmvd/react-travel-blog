describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'shuanie',
      username: 'test_abc',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input:first').type('test_abc')
    cy.get('input:last').type('123456')
    cy.contains('Loginiii').click()

    cy.contains('logged in as test_abc')
  })


  it('failed login', function(){
    cy.contains('login').click()
    cy.get('input:first').type('test_abc')
    cy.get('input:last').type('wrong')
    cy.contains('Loginiii').click()

    cy.contains('invalid username or password')

  })
  describe('when logged in', function(){
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('test_abc')
      cy.get('input:last').type('123456')
      cy.contains('Loginiii').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#titleField').type('a blog\'s title created by cypress')
      cy.get('#authorField').type('blog auther cypress')
      cy.get('#urlField').type('cypress test blog ink')
      cy.contains('Post Blog').click()
      cy.contains('a blog\'s title created by cypress')
    })


    describe('a blog already exits', function(){
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#titleField').type('a blog with 0 likes')
        cy.get('#authorField').type('blog auther 0')
        cy.get('#urlField').type('cypress test 0 likes blog link')
        cy.contains('Post Blog').click()
      })
      it('blog can be updated with likes', function() {
        cy.contains('a blog with 0 likes')
          .contains('show').click()

        cy.contains('likes: 0')
          .contains('Like This Blog').click()

        cy.contains('likes: 1')
      })
    })
  })



})


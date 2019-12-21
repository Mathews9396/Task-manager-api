const { calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add } = require('../src/math')

test('Should calcualte the tip along with the total',()=>{
    const total=calculateTip(10,0.3)
    expect(total).toBe(13)
    // if(total!==13){
    //     throw new Error('Total is wrong!'+total)
    // }
})

test('Should calculate total with default tip',()=>{
    const total=calculateTip(10)
    expect(total).toBe(12.5)
})

test("Should convert 32 F to 0 C",()=>{
    const temp=fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test("Should convert 0 C to 32 F",()=>{
    const temp=celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

test('Async test demo',(done)=>{
    setTimeout(()=>{
        expect(2).toBe(2)
        done()//jest waits until done is called - done can be anything
    },2000)
})

test('Should add 2 numbers', (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two number async/await', async()=>{
    const sum=await add(10,22)
    expect(sum).toBe(32)
})







//Why test
/**
 * savesTime
 * Creates reliable software
 * Gives flexibility  to developers
 *  -Refactoring
 *  -Collaborating
 *  -Profiling
 * Peace of mind
 */









// test('Hello world!', () => {
// })
// test('This should fail', () => {
//     throw new Error('Failure!')
// })
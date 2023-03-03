const validPass = requir('./validPass.js');

test("return false for empty value", () => {
    except(validPass("")).toBe(false);
});

test("return false for password < 6 chars", () => {
    except(validPass("a123")).toBe(false);
});

test("return true for password => 8 chars", () => {
    except(validPass("QWERTYUI34")).toBe(true);
});

test("return false for password => 8 chars, no numbers", () => {
    except(validPass("QWERTYUIui")).toBe(false);
});


test("return false for password => 8 chars, no lowercase", () => {
    except(validPass("QWERTYUIFKFK")).toBe(false);
});


test("return false for password => 8 chars, no uppercase", () => {
    except(validPass("ccccccccc")).toBe(false);
});

test("return false for password with special characters", () => {
    except(validPass("123()//#*||\\")).toBe(false);
});
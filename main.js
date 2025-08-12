const form = document.querySelector("form");
const bmiValue = document.querySelector("#bmiValue");
const bmiCategory = document.querySelector("#bmiCategory");
const resetBtn = document.querySelector(".reset_btn");
const resultBox = document.querySelector("#result"); 

const getCategory = (getBMI) => {
    let BMICategory = "";

    if (getBMI < 18.5) {
        BMICategory = "Underweight";
    } else if (getBMI < 25) {
        BMICategory = "Normal weight";
    } else if (getBMI < 30) {
        BMICategory = "Overweight";
    } else if (getBMI < 35) {
        BMICategory = "Obesity Class I";
    } else if (getBMI < 40) {
        BMICategory = "Obesity Class II";
    } else {
        BMICategory = "Obesity Class III";
    }

    return BMICategory;
}

const warnessage = (msg) => {
    if (document.querySelector(".warn_msg")) return;

    const warnElement = document.createElement("p");
    warnElement.classList.add("warn_msg");
    warnElement.innerHTML = msg;

    const btnElement = form.children[form.children.length - 1];
    btnElement.parentElement.insertBefore(warnElement, btnElement);

    gsap.from(warnElement, {
        y: -20,
        opacity: 0,
        duration: 0.4
    })

    setTimeout(() => {
        gsap.to(warnElement, {
            y: -20,
            opacity: 0,
            duration: 0.4,
            onComplete: () => warnElement.remove()
        })
    }, 3000)
}

const displayBMI = (event) => {
    event.preventDefault();

    const data = new FormData(form);
    let { age, weight, height, weightUnit, heightUnit } = Object.fromEntries(data.entries());

    age = Number(age);
    weight = Number(weight);
    height = Number(height);

    if (age <= 0) {
        warnessage("Enter age in a positive number");
        return;
    } else if (weight <= 0) {
        warnessage("Enter weight in a positive number");
        return;
    } else if (height <= 0) {
        warnessage("Enter height in a positive number");
        return;
    }

    let resultWeight = weight;
    if (weightUnit === "lb") {
        resultWeight = weight * 0.45359237;
    }

    let resultHeight = height;
    if (heightUnit === "cm") {
        resultHeight = height / 100;
    } else if (heightUnit === "ft") {
        resultHeight = height * 0.3048;
    }

    const getBMI = (resultWeight / (resultHeight ** 2)).toFixed(2);
    const category = getCategory(getBMI);

    bmiValue.innerHTML = getBMI;
    bmiCategory.innerHTML = category;

    gsap.fromTo(resultBox,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
}

form.addEventListener("submit", displayBMI);

resetBtn.addEventListener("click", () => {
    form.reset();
    bmiValue.innerHTML = "--";
    bmiCategory.innerHTML = "--";
});

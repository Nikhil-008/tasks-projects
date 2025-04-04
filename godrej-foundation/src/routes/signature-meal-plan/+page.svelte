<script>
// @ts-nocheck

</script>

<div class="flex flex-col lg:flex-row items-center lg:items-center max-w-6xl mx-auto p-6 mt-10">
  <!-- Left Section -->
  <div class="w-full lg:max-w-[532px] space-y-6">
    <!-- Title Section --> 
    <div>
      <h1 class="text-[24px] md:text-[28px] font-bold text-[#225043] font-playfair">Signature Meal Plan</h1>
      <p class="mt-2 text-[#26332F] text-base font-medium">Your Gateway to Healthy Eating</p>
      <p class="mt-2 text-[#26332F] text-sm md:text-base font-normal">
        Our most popular option, offering a selection of chef-crafted specials right to your door. Each meal is designed to be nutritious and satisfying, featuring a variety of seasonal ingredients and global flavors. But above all - it tastes awesome!
      </p> 
      <p class="mt-4 text-base font-normal text-[#26332F] hidden md:block">
        Starting from <span class="font-bold">₹400</span> per meal
      </p>
    </div>

    <!-- Form Section --> 

    <!-- method="POST"
    action="#" -->
    <form 
      class="space-y-6 max-w-[420px]"

      on:submit|preventDefault={e => console.log([...new FormData(e.target).entries()])}
    >
      <!-- Delivery Slot -->
      <fieldset class="space-y-4">
        <legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Slot:</legend>
        <div class="flex justify-between">
          <label for="breakfast" class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]">
            <input
              type="checkbox"
              id="breakfast"
              name="deliverySlot"
              value="breakfast"
              class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative
              checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] 
              checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
            />
            <span>Breakfast</span>
          </label>
        
          <label for="lunch" class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]">
            <input
              type="checkbox"
              id="lunch"
              name="deliverySlot"
              value="lunch"
              class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative
              checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] 
              checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
            />
            <span>Lunch</span>
          </label>
        
          <label for="dinner" class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]">
            <input
              type="checkbox"
              id="dinner"
              name="deliverySlot"
              value="dinner"
              class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative
              checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] 
              checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
            />
            <span>Dinner</span>
          </label>
        </div>
      </fieldset>

      <!-- Delivery Days -->
      <fieldset class="space-y-4">
        <legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Days:</legend>
        <div class="flex border border-[#225043] rounded-[8px] overflow-hidden">
          <label for="weekdays" class="flex-1 flex items-center justify-center px-4 py-2 cursor-pointer border-r border-[#225043] has-[:checked]:bg-[#22504314]">
            <input
              type="radio"
              id="weekdays"
              name="deliveryDays"
              value="weekdays"
              class="hidden"
            />
            <span>Weekdays</span>
          </label>
        
          <label for="everyday" class="flex-1 flex items-center justify-center px-4 py-2 cursor-pointer border-r border-[#225043] has-[:checked]:bg-[#22504314]">
            <input
              type="radio"
              id="everyday"
              name="deliveryDays"
              value="everyday"
              class="hidden"
            />
            <span>Everyday</span>
          </label>
        
          <label for="custom" class="flex-1 flex items-center justify-center px-4 py-2 cursor-pointer has-[:checked]:bg-[#22504314]">
            <input
              type="radio"
              id="custom"
              name="deliveryDays"
              value="custom"
              class="hidden"
            />
            <span>Custom</span>
          </label>
        </div>
      </fieldset>

      <!-- Delivery Duration -->
      <fieldset>
        <legend class="text-base font-normal text-[#26332F]">
          Choose Your Delivery Duration:
        </legend>
        <label for="delivery-duration" class="sr-only">Delivery Duration</label>
        <select
          id="deliveryDuration"
          name="deliveryDuration"
          class="block w-full mt-2 px-4 py-2 border-1 border-[#225043] rounded-[8px] cursor-pointer bg-white text-[#26332F]
          focus:border-[#225043] focus:ring-1 focus:outline-none"
        >
          <option value="1 week - ₹600 per meal">1 week - ₹600 per meal</option>
          <option value="2 weeks - ₹545 per meal">2 weeks - ₹545 per meal</option>
          <option value="1 month - ₹500 per meal">1 month - ₹500 per meal</option>
        </select>
      </fieldset>

      <!-- Buttons -->
      <div class="flex space-x-4 mt-12">
        <button
          class="px-7 md:px-15 py-3 bg-white text-[#225043] font-medium rounded-full shadow-md hover:bg-[#22504314] border border-[#22504366] text-center"
        >
          Trial
        </button>
        <button
        type="submit"
          class="px-7 md:px-15 py-3 bg-[#225043] text-white font-medium rounded-full text-center hover:bg-[#225043]/90"
        >
          Subscribe Now
        </button>
      </div>
    </form>
  </div>

  <!-- Right Section -->
  <div class="md:max-w-[500px] mt-10 lg:mt-0">
    <img src="/images/hero-signature.png" alt="Signature Meal Plan" class="w-full rounded-lg" />
  </div>
</div>
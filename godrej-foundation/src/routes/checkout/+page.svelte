<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import planData from '$lib/data/subscription-data.json';
  import ChevronDown from '$lib/components/icons/ChevronDown.svelte';

  let checkoutData: {
    planId: string;
    deliverySlots: string[];
    selectedDays: string[];
    deliveryDuration: string;
    selectedAddons?: { id: string; name: string; price: number; }[];
  } | null = null;

  let plan: any = null;

  let selectedAddress: { id: any; name?: string; address?: string; phone?: string; email?: string; } | null = null;
  let addresses = [
    {
      id: 1,
      name: 'Aditya',
      address: 'Street no. 7, Colony, Hyderabad, Telangana, 500033',
      phone: '+91 7856379088',
      email: 'aditya@able.do'
    },
    {
      id: 2,
      name: 'Aditya Work',
      address: 'Office Complex, Hi-tech City, Hyderabad, Telangana, 500081',
      phone: '+91 7856379088',
      email: 'aditya@able.do'
    }
  ];

  let walletBalance = 500.00;
  let costPerMeal = 85.00;
  let deliveryCostPerMeal = 0.00;

  // Get next available start date (next day)
  const getNextStartDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return {
      value: tomorrow.toISOString().split('T')[0],
      label: tomorrow.toLocaleDateString('en-US', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  };

  const startDateOption = getNextStartDate();
  let startDate = startDateOption.value;

  let isWalletBalanceUsed = false;
  let isProcessingPayment = false;
  let paymentError = '';

  let formattedDays = '';
  let formattedSlots = '';
  let addonTotal = 0;
  let totalMeals = 0;

  onMount(() => {
    const savedData = localStorage.getItem('checkoutData');
    if (!savedData) {
      // If no checkout data, redirect to home
      goto('/home');
      return;
    }

    checkoutData = JSON.parse(savedData);
    plan = planData.find(p => p.id === checkoutData?.planId);
    
    if (!plan) {
      // If plan not found, redirect to home
      goto('/home');
    }
  });

  // Helper functions for formatting
  function formatDays(days: string[] = []) {
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1, 3)).join('-');
  }

  function formatSlots(slots: string[] = []) {
    return slots.map(slot => slot.charAt(0).toUpperCase() + slot.slice(1)).join(', ');
  }

  function calculateTotalAmount(meals: number, addons: number) {
    const mealsTotal = meals * costPerMeal;
    const deliveryTotal = meals * deliveryCostPerMeal;
    return mealsTotal + deliveryTotal + addons;
  }

  // Consolidated reactive declarations
  $: {
    if (checkoutData) {
      formattedDays = formatDays(checkoutData.selectedDays);
      formattedSlots = formatSlots(checkoutData.deliverySlots);
      addonTotal = checkoutData.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
      totalMeals = checkoutData.selectedDays?.length || 0;
    }
  }

  $: totalAmount = calculateTotalAmount(totalMeals, addonTotal);
  $: finalAmount = isWalletBalanceUsed ? Math.max(0, totalAmount - walletBalance) : totalAmount;

  function goBack() {
    if (browser && plan?.product?.slug) {
      goto(`/meal-plan/${plan.product.slug}`);
    } else {
      goto('/home');
    }
  }

  async function makePayment() {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    try {
      isProcessingPayment = true;
      paymentError = '';

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear storage only after successful payment
      localStorage.removeItem('checkoutData');
      localStorage.removeItem('checkoutFormData'); // Clean up any remaining temp data
      
      // Navigate to success page
      goto('/');
    } catch (error) {
      console.error('Payment failed:', error);
      paymentError = 'Payment failed. Please try again.';
    } finally {
      isProcessingPayment = false;
    }
  }

  // Helper function to group addons by slot
  function groupAddonsBySlot(addons: any[], slots: any[]) {
    const grouped: { [key: string]: any[] } = {};
    
    slots.forEach(slot => {
      const slotAddons = addons.filter(addon => 
        slot.addons.some((slotAddon: { id: any; }) => slotAddon.id === addon.id)
      );
      if (slotAddons.length > 0) {
        grouped[slot.name] = slotAddons;
      }
    });
    
    return grouped;
  }

  $: groupedAddons = (checkoutData?.selectedAddons && plan?.slots) 
    ? groupAddonsBySlot(checkoutData.selectedAddons, plan.slots)
    : {};
</script>

<div class="flex flex-col md:flex-row justify-between gap-6 p-6 bg-white min-h-screen">
  <!-- Left Section -->
  <div class="w-full md:w-[58%]">
    <button on:click={goBack} class="flex items-center text-[#225043] mb-4">
      <ChevronDown size={24} direction="left" />
      <span class="ml-2 text-base font-normal">Back</span>
    </button>
  
    <div class="w-full space-y-6 p-8 md:p-10 lg:p-[60px] bg-white rounded-[12px]">
      <!-- Start Date -->
      <div class="space-y-2">
        <label for="startDate" class="text-base font-normal text-[#26332F]">Select Your Start Date</label>
        <select id="startDate" bind:value={startDate} class="w-full px-4 py-2 border border-[#B5C4C0] rounded-[8px] text-[#26332F] focus:border-[#225043] focus:ring-1 focus:outline-none">
          <option value={startDateOption.value}>{startDateOption.label}</option>
        </select>
      </div>
  
      <!-- Delivery Address -->
      <div class="space-y-2">
        <label for="deliveryAddress" class="text-base font-normal text-[#26332F]">Choose Your Delivery Address</label>
        <div class="flex flex-wrap items-center gap-4">
          {#each addresses as address (address.id)}
            <label class="flex items-start p-4 border border-[#B5C4C0] rounded-[12px] bg-[#F5F7F6] cursor-pointer w-[280px] h-[195px]">
              <input
                type="radio"
                id="deliveryAddress" name="address"
                checked={selectedAddress?.id === address.id}
                on:change={() => (selectedAddress = address)}
                class="mt-1 appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded-full cursor-pointer bg-white checked:border-[#225043] checked:bg-[#225043] relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45 flex-shrink-0"
              />
              <div class="ml-3 flex flex-col gap-2">
                <p class="text-sm font-medium text-[#26332F]">{address.name}</p>
                <p class="text-xs text-[#26332F] line-clamp-2">{address.address}</p>
                <p class="text-xs text-[#26332F]">{address.phone}</p>
                <p class="text-xs text-[#26332F]">{address.email}</p>
              </div>
            </label>
          {/each}
        </div>
        <button class="w-full px-4 py-2 border border-[#B5C4C0] rounded-[8px] text-[#225043] hover:bg-[#22504314]">+ Add New Address</button>
        <p class="text-sm text-[#225043] mt-2">Free Delivery</p>
      </div>
    </div>
  </div>

  <!-- Right Section -->
  {#if plan && checkoutData}
    <div class="w-full md:w-[42%] bg-[#F5F7F6] py-6 px-8 md:px-14 rounded-[12px] space-y-4">
      <h2 class="text-xl font-semibold text-[#26332F]">Order Summary</h2>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <div class="space-y-4">
        <!-- Meal Plan Details -->
        <div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-[#26332F]">Meal Plan</span>
            <button class="text-[#225043] text-sm">
              <ChevronDown size={16} />
            </button>
          </div>
          <p class="text-sm text-[#26332F]">{plan.name}</p>
        </div>
        
        <!-- Add Meal Slots -->
        <div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-[#26332F]">Meals</span>
            <button class="text-[#225043] text-sm">
              <ChevronDown size={16} />
            </button>
          </div>
          <p class="text-sm text-[#26332F]">{formattedSlots}</p>
        </div>

        <div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-[#26332F]">Delivery Days</span>
            <button class="text-[#225043] text-sm">
              <ChevronDown size={16} />
            </button>
          </div>
          <p class="text-sm text-[#26332F]">{formattedDays}</p>
        </div>

        <div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-[#26332F]">Subscription Duration</span>
            <button class="text-[#225043] text-sm">
              <ChevronDown size={16} />
            </button>
          </div>
          <p class="text-sm text-[#26332F]">{checkoutData.deliveryDuration.split('-')[0].trim()}</p>
        </div>

        <!-- Add-ons Section -->
        {#if checkoutData.selectedAddons && checkoutData.selectedAddons.length > 0}
          <div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#26332F]">Add-ons</span>
              <button class="text-[#225043] text-sm">
                <ChevronDown size={16} />
              </button>
            </div>
            <div class="space-y-4 mt-2">
              {#each Object.entries(groupedAddons) as [slotName, slotAddons]}
                <div>
                  <p class="text-sm font-medium text-[#26332F] capitalize">{slotName}</p>
                  <p class="text-sm text-[#26332F]">
                    {slotAddons.map(addon => addon.name).join(', ')}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <div class="border-t border-[#B5C4C0] pt-4">
          <div class="flex justify-between">
            <span class="text-sm text-[#26332F]">Total Meals :</span>
            <span class="text-sm text-[#26332F]">{totalMeals}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-[#26332F]">Cost per meal :</span>
            <span class="text-sm text-[#26332F]">₹{costPerMeal}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-[#26332F]">Delivery cost per meal :</span>
            <span class="text-sm text-[#26332F]">₹{deliveryCostPerMeal}</span>
          </div>
          <div class="flex justify-between font-semibold mt-2">
            <span class="text-sm text-[#26332F]">Total :</span>
            <span class="text-sm text-[#26332F]">₹{totalAmount.toFixed(2)}</span>
          </div>
          {#if isWalletBalanceUsed}
            <div class="flex justify-between text-sm text-[#26332F]">
              <span>Wallet balance applied:</span>
              <span>-₹{Math.min(walletBalance, totalAmount).toFixed(2)}</span>
            </div>
          {/if}
          <div class="flex justify-between font-semibold mt-2">
            <span class="text-sm text-[#26332F]">Final Amount:</span>
            <span class="text-sm text-[#26332F]">₹{finalAmount.toFixed(2)}</span>
          </div>
        </div>

        <label class="flex items-center gap-2">
          <input 
            type="checkbox" 
            bind:checked={isWalletBalanceUsed}
            class="w-4 h-4 text-[#225043] border-[#B5C4C0] rounded focus:ring-[#225043]" 
          />
          <span class="text-sm text-[#26332F]">Use available wallet balance ₹{walletBalance}</span>
        </label>

        {#if paymentError}
          <p class="text-red-500 text-sm">{paymentError}</p>
        {/if}

        <button 
          on:click={makePayment} 
          class="w-full bg-[#1A3C2E] text-white px-4 py-2 rounded-[8px] text-sm font-medium hover:bg-[#1A3C2E]/90 disabled:opacity-50"
          disabled={isProcessingPayment}
        >
          {#if isProcessingPayment}
            Processing...
          {:else}
            Make Payment <span>→</span>
          {/if}
        </button>
      </div>
    </div>
  {:else}
    <p class="text-center text-[#26332F]">Loading...</p>
  {/if}
</div>
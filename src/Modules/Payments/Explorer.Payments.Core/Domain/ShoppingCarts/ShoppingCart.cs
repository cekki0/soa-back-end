﻿using Explorer.BuildingBlocks.Core.Domain;

namespace Explorer.Payments.Core.Domain.ShoppingCarts;

public class ShoppingCart : Entity
{
    public long TouristId { get; init; }
    public double TotalPrice { get; set; }
    public bool IsPurchased { get; init; }

    public ICollection<OrderItem> OrderItems { get; } = new List<OrderItem>();


    public ShoppingCart(long touristId, bool isPurchased)
    {
        TouristId = touristId;
        SetTotalPrice();
        IsPurchased = isPurchased;  //provjeriti
        Validate();
    }

    private void Validate()
    {
        if (TotalPrice < 0) throw new ArgumentException("Invalid total price.");
    }

    public void AddOrderItem(OrderItem newOrderItem)
    {
        OrderItems.Add(newOrderItem);
    }

    public void RemoveOrderItem(long id)
    {
        var item = OrderItems.FirstOrDefault(x => x.Id== id);
        OrderItems.Remove(item);

    }


    public void SetTotalPrice()
    {
        TotalPrice = 0;
        if (OrderItems != null)
        {
            foreach (var items in OrderItems)
            {
                TotalPrice += items.Price;
            }
        }
    }

}
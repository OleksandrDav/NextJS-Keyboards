"use client";

import React, { useState } from "react";
import { User, Order } from "@prisma/client";
import { Container } from "../container";
import { Title } from "../title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ProfileForm } from "./profile-form";
import { OrdersHistory } from "./orders-history";

interface Props {
  user: User & {
    orders: Order[];
  };
}

export const ProfilePage: React.FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Container className="mb-10 mt-2">
      <div className="flex flex-col gap-6">
        <div>
          <Title text={`Welcome, ${user.firstName}!`} size="lg" className="font-bold" />
          <p className="text-gray-500 mt-2">Manage your account and view your orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileForm data={user} />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrdersHistory orders={user.orders} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};
Refer to the prisma documentation on how to create migrations.
These are the modifications needed after using `npx prisma migrate dev --create-only`:

Due to prisma using SERIAL instead of a generated identity,
change `SERIAL` keywords to `integer` and add
```sql
ALTER TABLE "XXX" ALTER COLUMN "XXX_id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "XXX_XXX_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
```
where XXX is the table name.

